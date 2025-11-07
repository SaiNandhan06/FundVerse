import { Link } from 'react-router-dom';

function CreateCampaign() {
  return (
    <div className="min-h-screen bg-fundverseBgLight">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-fundverseGrayDark mb-6">
              Launch Your Startup
            </h1>

            {/* Subtext */}
            <p className="text-mutedText mb-8 text-lg">
              Need help? Check out our{' '}
              <a
                href="#"
                className="text-fundverseOrange hover:opacity-80 underline transition-colors"
              >
                student entrepreneur guide
              </a>
              .
            </p>

            {/* Create Campaign Button */}
            <Link
              to="/create/form"
              className="inline-block bg-fundverse-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
            >
              Create New Startup Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;

