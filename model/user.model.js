const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // --- Identity & Access ---
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessOwner",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "teacher", "student", "parent"],
      required: true,
    },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true, select: false },

    // --- Profile Information ---
    firstName: String,
    lastName: String,
    phone: String,

    // --- Role-Specific Metadata ---
    // Using a sub-document for flexibility
    metadata: {
      // For Students
      enrollmentDate: Date,
      internshipStatus: {
        type: String,
        enum: ["pending", "active", "completed"],
      },
      parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Links Student to Parent

      // For Teachers
      specialization: [String], // e.g., ['React', 'Node.js']
      salary: Number,

      // For Parents
      children: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Links Parent to Students
    },
  },
  { timestamps: true },
);

// Indexing for performance and multi-tenancy security
userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
