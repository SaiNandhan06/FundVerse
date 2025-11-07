function DashboardCard({ title, value, icon, subtitle, iconBg }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-mutedText text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-fundverseGrayDark">{value}</p>
          {subtitle && (
            <p className="text-sm mt-2 text-mutedText">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 ${iconBg || 'bg-fundverse-gradient'} rounded-lg flex items-center justify-center shadow-sm`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;

