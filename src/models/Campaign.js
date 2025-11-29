/**
 * Campaign data model with validation and defaults
 */
export class Campaign {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.campaignTitle = data.campaignTitle || '';
    this.campaignTagline = data.campaignTagline || '';
    this.category = data.category || '';
    this.creatorType = data.creatorType || 'Student';
    this.description = data.description || '';
    this.targetAmount = data.targetAmount || 0;
    this.minimumContribution = data.minimumContribution || 0;
    this.deadline = data.deadline || '';
    this.raised = data.raised || 0;
    this.backers = data.backers || 0;
    this.status = data.status || 'Pending';
    this.created = data.created || new Date().toISOString();
    this.updated = data.updated || new Date().toISOString();
    this.creator = {
      name: data.creator?.name || data.creatorName || '',
      email: data.creator?.email || data.email || '',
      organization: data.creator?.organization || data.organization || '',
      city: data.creator?.city || data.city || '',
      state: data.creator?.state || data.state || '',
    };
    this.milestones = data.milestones || [];
    this.images = data.images || {
      cover: data.coverImage || null,
      additional: data.additionalImages || [],
    };
    this.pitchDeck = data.pitchDeck || null;
    this.idProof = data.idProof || null;
  }

  generateId() {
    return `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculate funded percentage
   */
  getFundedPercent() {
    if (this.targetAmount === 0) return 0;
    return Math.min(100, Math.round((this.raised / this.targetAmount) * 100));
  }

  /**
   * Calculate days left
   */
  getDaysLeft() {
    if (!this.deadline) return 0;
    const deadline = new Date(this.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Validate campaign data
   */
  validate() {
    const errors = {};
    
    if (!this.campaignTitle.trim()) {
      errors.campaignTitle = 'Campaign title is required';
    }
    if (!this.campaignTagline.trim()) {
      errors.campaignTagline = 'Campaign tagline is required';
    }
    if (!this.category) {
      errors.category = 'Category is required';
    }
    if (!this.description.trim() || this.description.length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }
    if (!this.targetAmount || this.targetAmount <= 0) {
      errors.targetAmount = 'Valid target amount is required';
    }
    if (!this.deadline) {
      errors.deadline = 'Deadline is required';
    }
    if (!this.creator.name.trim()) {
      errors.creatorName = 'Creator name is required';
    }
    if (!this.creator.email.trim() || !/\S+@\S+\.\S+/.test(this.creator.email)) {
      errors.email = 'Valid email is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Convert to JSON for storage
   */
  toJSON() {
    return {
      id: this.id,
      campaignTitle: this.campaignTitle,
      campaignTagline: this.campaignTagline,
      category: this.category,
      creatorType: this.creatorType,
      description: this.description,
      targetAmount: this.targetAmount,
      minimumContribution: this.minimumContribution,
      deadline: this.deadline,
      raised: this.raised,
      backers: this.backers,
      status: this.status,
      created: this.created,
      updated: this.updated,
      creator: this.creator,
      creatorName: this.creator.name, // Also save for easy access
      email: this.creator.email, // Also save for easy access
      milestones: this.milestones,
      images: this.images,
      coverImage: this.images?.cover || null, // Also save coverImage directly for compatibility
      additionalImages: this.images?.additional || [],
      pitchDeck: this.pitchDeck,
      idProof: this.idProof,
    };
  }

  /**
   * Create from JSON
   */
  static fromJSON(json) {
    return new Campaign(json);
  }
}

