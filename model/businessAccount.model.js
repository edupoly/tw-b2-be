const mongoose = require("mongoose");
const validator = require("validator");

const businessOwnerSchema = new mongoose.Schema(
  {
    // --- Personal Information ---
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false, // Don't return password in queries by default
    },

    // --- Institute/Business Details ---
    instituteName: {
      type: String,
      required: [true, "Institute name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    }, // Useful for custom URLs like myinstitute.your-crm.com
    logo: String,
    website: String,

    // --- SaaS Subscription Control ---
    subscription: {
      plan: {
        type: String,
        enum: ["basic", "professional", "enterprise"],
        default: "basic",
      },
      status: {
        type: String,
        enum: ["active", "past_due", "canceled", "trialing"],
        default: "trialing",
      },
      stripeCustomerId: String,
      trialEndsAt: Date,
    },

    // --- CRM Specific Settings ---
    settings: {
      currency: { type: String, default: "USD" },
      timezone: { type: String, default: "UTC" },
    },

    // --- Role Control ---
    role: {
      type: String,
      default: "owner",
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual populate to see all courses linked to this owner
businessOwnerSchema.virtual("courses", {
  ref: "Course",
  foreignField: "owner",
  localField: "_id",
});

const BusinessOwner = mongoose.model("BusinessOwner", businessOwnerSchema);

module.exports = BusinessOwner;
