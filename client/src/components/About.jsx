import { FaCheckDouble, FaPlay } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
          <div className="w-16 h-1 bg-cyan-600 mx-auto mt-3"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video / Image Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Medical Clinic"
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center pl-1 shadow-lg hover:bg-cyan-700 hover:scale-110 transition">
                <FaPlay className="text-xl" />
              </div>
            </a>
          </div>

          {/* Right: Text Details */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 leading-snug">
              Enim quis est voluptatibus aliquid consequatur fugiat
            </h3>
            <p className="italic text-gray-600 mt-3 text-sm">
              Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium.
            </p>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <FaCheckDouble className="text-cyan-600 text-lg shrink-0 mt-0.5" />
                <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaCheckDouble className="text-cyan-600 text-lg shrink-0 mt-0.5" />
                <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda.</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaCheckDouble className="text-cyan-600 text-lg shrink-0 mt-0.5" />
                <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
              </li>
            </ul>

            <p className="text-sm text-gray-600 mt-6 leading-relaxed">
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}