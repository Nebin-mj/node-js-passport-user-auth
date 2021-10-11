const mongoose = require("mongoose");

(async () => {
   try {
      await mongoose.connect(process.env.mongoUrl, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      });
      console.log("MongoDB connected...");
   } catch (err) {
      console.log(err);
   }
})();

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      hash: {
         type: String,
         required: true,
      },
      salt: {
         type: String,
         required: true,
      },
      date: {
         type: Date,
         default: Date.now,
      },
   },
   {
      collection: "userData",
   }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
