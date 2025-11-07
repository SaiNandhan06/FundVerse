import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCampaignForm() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Details
    campaignTitle: '',
    campaignTagline: '',
    category: '',
    creatorType: 'Student',
    
    // Campaign Description
    description: '',
    pitchDeck: null,
    
    // Funding Details
    targetAmount: '',
    minimumContribution: '',
    deadline: '',
    hasMilestones: false,
    milestones: [{ title: '', amount: '', description: '' }],
    
    // Visuals
    coverImage: null,
    additionalImages: [],
    
    // Contact & Verification
    creatorName: '',
    email: '',
    organization: '',
    city: '',
    state: '',
    idProof: null,
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (name === 'coverImage') {
        setFormData({ ...formData, coverImage: files[0] || null });
      } else if (name === 'additionalImages') {
        setFormData({ ...formData, additionalImages: Array.from(files) });
      } else if (name === 'pitchDeck') {
        setFormData({ ...formData, pitchDeck: files[0] || null });
      } else if (name === 'idProof') {
        setFormData({ ...formData, idProof: files[0] || null });
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle milestone changes
  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index][field] = value;
    setFormData({ ...formData, milestones: updatedMilestones });
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: '', amount: '', description: '' }],
    });
  };

  const removeMilestone = (index) => {
    const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: updatedMilestones });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.campaignTitle.trim()) {
      newErrors.campaignTitle = 'Campaign title is required';
    }
    if (!formData.campaignTagline.trim()) {
      newErrors.campaignTagline = 'Campaign tagline is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description.trim() || formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Valid target amount is required';
    }
    if (!formData.minimumContribution || parseFloat(formData.minimumContribution) <= 0) {
      newErrors.minimumContribution = 'Valid minimum contribution is required';
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }
    if (!formData.creatorName.trim()) {
      newErrors.creatorName = 'Creator name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.creatorType === 'Student' && !formData.organization.trim()) {
      newErrors.organization = 'Organization/College is required for students';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }
    if (!formData.idProof) {
      newErrors.idProof = 'ID proof is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle preview
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/discover');
      }, 2000);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount || 0).toLocaleString('en-IN')}`;
  };

  return (
    <main className="bg-[#F9FAFB] min-h-screen py-12 px-4">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Start Your Campaign</h1>
          <p className="text-[#6B7280]">
            Launch your idea on FundVerse and connect with supporters around the world.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Basic Details */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Basic Details</h2>
            
            <div className="space-y-6">
              {/* Campaign Title */}
              <div>
                <label htmlFor="campaignTitle" className="block text-sm font-medium text-[#111827] mb-2">
                  Campaign Title <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  id="campaignTitle"
                  name="campaignTitle"
                  value={formData.campaignTitle}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.campaignTitle
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                  placeholder="e.g., AI-Powered Soil Health Scanner"
                />
                {errors.campaignTitle && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.campaignTitle}</p>
                )}
              </div>

              {/* Campaign Tagline */}
              <div>
                <label htmlFor="campaignTagline" className="block text-sm font-medium text-[#111827] mb-2">
                  Campaign Tagline <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  id="campaignTagline"
                  name="campaignTagline"
                  value={formData.campaignTagline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.campaignTagline
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                  placeholder="A short, compelling tagline for your campaign"
                />
                {errors.campaignTagline && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.campaignTagline}</p>
                )}
              </div>

              {/* Category and Creator Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[#111827] mb-2">
                    Category <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.category
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Social Impact">Social Impact</option>
                    <option value="Art & Design">Art & Design</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Creator Type <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="creatorType"
                        value="Student"
                        checked={formData.creatorType === 'Student'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#3B82F6] border-[#E5E7EB] focus:ring-[#3B82F6]"
                      />
                      <span className="ml-2 text-[#111827]">Student</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="creatorType"
                        value="Company"
                        checked={formData.creatorType === 'Company'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#3B82F6] border-[#E5E7EB] focus:ring-[#3B82F6]"
                      />
                      <span className="ml-2 text-[#111827]">Company</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Campaign Description */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Campaign Description</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#111827] mb-2">
                  Detailed Description <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.description
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                  placeholder="Describe your idea in detail. What problem does it solve? How will it help people? What makes it unique?"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-[#6B7280]">
                  {formData.description.length} characters (minimum 50 required)
                </p>
              </div>

              <div>
                <label htmlFor="pitchDeck" className="block text-sm font-medium text-[#111827] mb-2">
                  Pitch Deck (Optional)
                </label>
                <input
                  type="file"
                  id="pitchDeck"
                  name="pitchDeck"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 text-[#111827]"
                />
                <p className="mt-1 text-sm text-[#6B7280]">Upload a PDF file (max 10MB)</p>
              </div>
            </div>
          </div>

          {/* 3. Funding Details */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Funding Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium text-[#111827] mb-2">
                    Target Amount (₹) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="number"
                    id="targetAmount"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.targetAmount
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="50000"
                  />
                  {errors.targetAmount && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.targetAmount}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="minimumContribution" className="block text-sm font-medium text-[#111827] mb-2">
                    Minimum Contribution (₹) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="number"
                    id="minimumContribution"
                    name="minimumContribution"
                    value={formData.minimumContribution}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.minimumContribution
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="500"
                  />
                  {errors.minimumContribution && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.minimumContribution}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-[#111827] mb-2">
                  Campaign Deadline <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.deadline
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                />
                {errors.deadline && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.deadline}</p>
                )}
              </div>

              {/* Milestones */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasMilestones"
                    checked={formData.hasMilestones}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#3B82F6] border-[#E5E7EB] rounded focus:ring-[#3B82F6]"
                  />
                  <span className="ml-2 text-[#111827] font-medium">Add Funding Milestones</span>
                </label>
              </div>

              {formData.hasMilestones && (
                <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-[#111827]">Milestones</h3>
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="bg-[#F9FAFB] rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-[#111827]">Milestone {index + 1}</h4>
                        {formData.milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(index)}
                            className="text-[#DC2626] hover:text-[#B91C1C] text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Milestone title"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                      <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={milestone.amount}
                        onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                      <textarea
                        placeholder="Description"
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="w-full py-2 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white transition-all duration-300"
                  >
                    + Add Another Milestone
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4. Visuals */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Visuals</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-[#111827] mb-2">
                  Cover Image <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,.png"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.coverImage
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                />
                {errors.coverImage && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.coverImage}</p>
                )}
                {formData.coverImage && (
                  <div className="mt-4">
                    <p className="text-sm text-[#6B7280] mb-2">Preview:</p>
                    <img
                      src={URL.createObjectURL(formData.coverImage)}
                      alt="Cover preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-[#E5E7EB]"
                    />
                  </div>
                )}
                <p className="mt-1 text-sm text-[#6B7280]">Upload JPG or PNG (max 5MB)</p>
              </div>

              <div>
                <label htmlFor="additionalImages" className="block text-sm font-medium text-[#111827] mb-2">
                  Additional Images (Optional)
                </label>
                <input
                  type="file"
                  id="additionalImages"
                  name="additionalImages"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,.png"
                  multiple
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:border-[#3B82F6] focus:ring-[#3B82F6] transition-all duration-200 text-[#111827]"
                />
                {formData.additionalImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.additionalImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-[#E5E7EB]"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-sm text-[#6B7280]">Upload multiple images (max 5MB each)</p>
              </div>
            </div>
          </div>

          {/* 5. Contact & Verification */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">Contact & Verification</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="creatorName" className="block text-sm font-medium text-[#111827] mb-2">
                    Creator Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="creatorName"
                    name="creatorName"
                    value={formData.creatorName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.creatorName
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="Your full name"
                  />
                  {errors.creatorName && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.creatorName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                    Email <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.email}</p>
                  )}
                </div>
              </div>

              {formData.creatorType === 'Student' && (
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-[#111827] mb-2">
                    Organization/College <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.organization
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="e.g., IIT Bombay, NIT Trichy"
                  />
                  {errors.organization && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.organization}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#111827] mb-2">
                    City <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.city
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="e.g., Bangalore"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-[#111827] mb-2">
                    State <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.state
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                    } text-[#111827]`}
                    placeholder="e.g., Karnataka"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="idProof" className="block text-sm font-medium text-[#111827] mb-2">
                  ID Proof <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="file"
                  id="idProof"
                  name="idProof"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.idProof
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E5E7EB] focus:border-[#3B82F6] focus:ring-[#3B82F6]'
                  } text-[#111827]`}
                />
                {errors.idProof && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.idProof}</p>
                )}
                <p className="mt-1 text-sm text-[#6B7280]">Upload Aadhaar, PAN, or College ID (max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 px-6 py-3 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6] hover:text-white transition-all duration-300 hover:scale-[1.03]"
              >
                Preview Campaign
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:bg-[#2563EB] transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-lg"
              >
                Submit Campaign
              </button>
            </div>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#111827]">Campaign Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-[#6B7280] hover:text-[#111827] text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {formData.coverImage && (
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Campaign cover"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">{formData.campaignTitle}</h3>
                  <p className="text-[#6B7280] text-lg mb-4">{formData.campaignTagline}</p>
                  <div className="flex gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] rounded-full text-sm font-medium">
                      {formData.category}
                    </span>
                    <span className="px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] rounded-full text-sm font-medium">
                      {formData.creatorType}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-[#E5E7EB] pt-6">
                  <h4 className="font-semibold text-[#111827] mb-2">Description</h4>
                  <p className="text-[#6B7280] whitespace-pre-wrap">{formData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-[#E5E7EB] pt-6">
                  <div>
                    <p className="text-sm text-[#6B7280]">Target Amount</p>
                    <p className="text-xl font-bold text-[#111827]">{formatCurrency(formData.targetAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Minimum Contribution</p>
                    <p className="text-xl font-bold text-[#111827]">{formatCurrency(formData.minimumContribution)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Deadline</p>
                    <p className="text-lg font-semibold text-[#111827]">
                      {formData.deadline ? new Date(formData.deadline).toLocaleDateString('en-IN') : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Creator</p>
                    <p className="text-lg font-semibold text-[#111827]">{formData.creatorName}</p>
                  </div>
                </div>
                
                {formData.hasMilestones && formData.milestones.length > 0 && (
                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h4 className="font-semibold text-[#111827] mb-4">Milestones</h4>
                    <div className="space-y-3">
                      {formData.milestones.map((milestone, index) => (
                        <div key={index} className="bg-[#F9FAFB] rounded-lg p-4">
                          <p className="font-medium text-[#111827]">{milestone.title || `Milestone ${index + 1}`}</p>
                          <p className="text-[#3B82F6] font-semibold">{formatCurrency(milestone.amount)}</p>
                          <p className="text-sm text-[#6B7280] mt-1">{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-6 border-t border-[#E5E7EB] pt-6">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#111827] rounded-lg font-semibold hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:bg-[#2563EB] transition-all duration-300"
                >
                  Submit Campaign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">Campaign Submitted Successfully!</h2>
              <p className="text-[#6B7280] mb-6">
                Your campaign is under review. We'll notify you once it's published.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6] mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CreateCampaignForm;

