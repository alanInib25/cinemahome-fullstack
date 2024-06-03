const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username:{
      type: String,
      require: true,
      unique: true,
      trim: true,
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
