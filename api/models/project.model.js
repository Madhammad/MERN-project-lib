import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema(
      {

            projectImage: {
                  secure_url: {
                        type: String, // cloudinary url
                        default:
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAD34Y2hQGurxFzuhwk_mVh1_t9Y9O3mC-LA&s",
                  },
                  public_id: {
                        type: String, // cloudinary url
                        default: null
                  },
            },
            title: {
                  type: String,
                  required: true,
                  unique: true,

            },
            description: {
                  type: String,
                  required: true,

            },
            category: {
                  type: String,
                  default: 'uncategorized',
            },
            details: {
                  type: String,
                  required: true
            },
            webSite: {
                  type: String,
                  unique: true,
                  sparse: true,
                  lowercase: true,
                  trim: true,

            },
            githubLink: {
                  type: String,
                  unique: true,
                  sparse: true,
                  lowercase: true,
                  trim: true,
                  validate: {
                        validator: function (v) {
                              return v === undefined || /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[\w.-]+\/?$/.test(v);
                        },
                        message: props => `${props.value} is not a valid GitHub URL!`
                  }
            },
            tags: [{ type: String, trim: true }],

            isPublic: {
                  type: Boolean,
                  default: true
            },
            createdBy: {
                  type: Schema.Types.ObjectId,
                  ref: "User",
                  required: true
            },
            totalLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

      },
      {
            timestamps: true
      }
)


export const Project = mongoose.model("Project", projectSchema);
