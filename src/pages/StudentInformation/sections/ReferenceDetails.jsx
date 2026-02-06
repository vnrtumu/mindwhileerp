import React from 'react';

const ReferenceDetails = ({ formData, handleChange }) => {
  return (
    <div className="form-section">
      <div className="section-header">
        <h5>Reference Details</h5>
        <span className="section-description">Provided reference and guardian information</span>
      </div>

      <div className="form-grid-two-col">
        <div className="form-group">
          <label>Guardian Name</label>
          <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="Enter guardian name" className="form-input" />
        </div>

        <div className="form-group">
          <label>Guardian Relation</label>
          <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} placeholder="e.g., Uncle, Neighbor" className="form-input" />
        </div>

        <div className="form-group">
          <label>Guardian Phone</label>
          <input type="text" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} placeholder="Guardian phone number" className="form-input" />
        </div>

        <div className="form-group">
          <label>Reference Contact</label>
          <input type="text" name="referenceContact" value={formData.referenceContact} onChange={handleChange} placeholder="Reference phone or email" className="form-input" />
        </div>

        <div className="form-group">
          <label>Reference Address</label>
          <input type="text" name="referenceAddress" value={formData.referenceAddress} onChange={handleChange} placeholder="Reference address" className="form-input" />
        </div>

        <div className="form-group">
          <label>Local Guardian</label>
          <input type="text" name="localGuardian" value={formData.localGuardian} onChange={handleChange} placeholder="Local guardian name" className="form-input" />
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetails;
