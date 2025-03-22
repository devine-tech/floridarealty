import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide a street address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide a zip code'],
    },
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'land'],
    required: [true, 'Please specify property type'],
  },
  status: {
    type: String,
    enum: ['for-sale', 'for-rent', 'sold', 'pending'],
    default: 'for-sale',
  },
  features: {
    bedrooms: {
      type: Number,
      required: function() {
        return this.propertyType === 'residential';
      },
    },
    bathrooms: {
      type: Number,
      required: function() {
        return this.propertyType === 'residential';
      },
    },
    squareFeet: {
      type: Number,
      required: [true, 'Please provide square footage'],
    },
    lotSize: Number,
    yearBuilt: Number,
    parking: String,
    amenities: [String],
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  realtor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
PropertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
