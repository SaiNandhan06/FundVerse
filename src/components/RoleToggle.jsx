function RoleToggle({ role, onRoleChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-gray-700">
        Select Your Role
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => onRoleChange('student')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            role === 'student'
              ? 'bg-fundverse-gradient text-white shadow-lg'
              : 'bg-fundverseBgLight text-fundverseGrayDark hover:bg-fundverseGrayLight'
          }`}
        >
          Student
        </button>
        <button
          onClick={() => onRoleChange('company')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            role === 'company'
              ? 'bg-fundverse-gradient text-white shadow-lg'
              : 'bg-fundverseBgLight text-fundverseGrayDark hover:bg-fundverseGrayLight'
          }`}
        >
          Company
        </button>
      </div>
    </div>
  );
}

export default RoleToggle;

