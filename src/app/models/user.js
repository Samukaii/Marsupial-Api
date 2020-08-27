const mongoose = require("../../database");
const mongoosePaginate = require("mongoose-paginate");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    roles: [
        {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
    ],
    created_account: {
        type: Date,
        default: Date.now,
    },
    updated_account: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", function (next) {
    if (this.isNew || this.isModified) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if (err) {
                next(err);
            } else {
                this.password = hashed;
                next();
            }
        });
    }
});

UserSchema.methods.checkPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) callback(err);
        else callback(err, same);
    });
};

module.exports = mongoose.model("User", UserSchema);
