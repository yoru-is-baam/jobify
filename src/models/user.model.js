import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		select: false,
	},
	lastName: {
		type: String,
		default: "lastName",
	},
	location: {
		type: String,
		default: "my city",
	},
});

UserSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model("User", UserSchema);
