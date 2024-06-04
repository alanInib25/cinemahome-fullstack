const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username:{
      type: String,
      require: true,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 15,
    },
    email:{
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    password:{
      type: String,
      require: true,
      trim: true,
      minLength: 6,
      maxLength: 12,
    },
    role:{
      type: ["admin", "user"],
      default: "user"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
