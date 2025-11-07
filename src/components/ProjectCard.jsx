import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

function ProjectCard({
  image,
  category,
  title,
  description,
  creator,
  raised,
  goal,
  fundedPercent,
  backers,
  daysLeft,
  projectId
}) {
  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] flex items-center justify-center text-white font-bold text-xl">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span>{title.charAt(0)}</span>
          )}
        </div>
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#111827] shadow-md">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Description */}
        <h3 className="text-lg font-bold text-[#111827] mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-[#374151] mb-4 line-clamp-2">{description}</p>

        {/* Creator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-xs font-bold">
            {creator ? creator.charAt(0).toUpperCase() : 'C'}
          </div>
          <span className="text-sm text-[#374151]">{creator}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar value={parseFloat(fundedPercent)} />
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div>
            <p className="text-[#6B7280]">Raised</p>
            <p className="font-semibold text-[#111827]">{raised}</p>
          </div>
          <div className="text-center">
            <p className="text-[#6B7280]">Goal</p>
            <p className="font-semibold text-[#111827]">{goal}</p>
          </div>
          <div className="text-right">
            <p className="text-[#6B7280]">Backers</p>
            <p className="font-semibold text-[#111827]">{backers}</p>
          </div>
        </div>

        {/* Days Left */}
        <p className="text-sm text-[#6B7280] mb-4">{daysLeft} days left</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/campaign/${projectId || '1'}`}
            className="flex-1 px-4 py-2 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white transition-colors text-center"
          >
            View Details
          </Link>
          <Link
            to="/support"
            className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors text-center"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
