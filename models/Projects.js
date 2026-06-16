import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        year: {
            type: Number,
            min: [1900, "Invalid year"],
            max: [new Date().getFullYear(), "Invalid year"],
        },

        location: {
            type: String,
            trim: true,
            default: "",
        },

        cost: {
            type: Number,
            min: [0, "Cost must be a positive number"],
            default: 0,
        },

        type: {
            type: String,
            trim: true,
            default: "",
        },

        region: {
            type: String,
            trim: true,
            default: "",
        },

        sectors: { type: Array, default: [] },
        images: {
            type: [String],
            validate: {
                validator: (arr) => arr.length > 0,
                message: "At least one image is required",
            },
            required: true,
        },

        headerimage: {
            type: String,
            trim: true,
            default: "",
        },
        consturctionimages: {
            type: [String],
            required: function () {
                return this.status === "active" || this.status === "complete";
            },
            validate: {
                validator: function (arr) {
                    if (this.status === "active" || this.status === "complete") {
                        return Array.isArray(arr) && arr.length > 0;
                    }
                    return true;
                },
                message: "Construction images are required when project is active or complete",
            },
        },

        status: {
            type: String,
        },
        markforhomepage: {
            type: Boolean,
            default: false,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Services"
            }
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Projects || mongoose.model("Projects", ProjectSchema);
