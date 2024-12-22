import { NextPage } from "next";
import { Globe2, Users, Target, Award } from "lucide-react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-[#222222] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Shaping Tomorrow's Politics Today
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              We are dedicated to fostering meaningful political discourse and
              engagement across linguistic and cultural boundaries.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe2 className="h-12 w-12 text-[#222222]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Breaking language barriers to connect political discussions
                worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-[#222222]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusive Dialogue</h3>
              <p className="text-gray-600">
                Creating spaces for diverse voices and perspectives in political
                discourse.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="h-12 w-12 text-[#222222]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Informed Decision-Making
              </h3>
              <p className="text-gray-600">
                Empowering citizens with accurate, multilingual political
                information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FC3E02]">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in open, honest communication and maintaining the
                highest standards of journalistic integrity in all languages we
                serve.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FC3E02]">
                Accessibility
              </h3>
              <p className="text-gray-600">
                Making political information accessible to everyone, regardless
                of their native language or background.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FC3E02]">
                Impartiality
              </h3>
              <p className="text-gray-600">
                Committed to presenting balanced viewpoints and fostering
                constructive political dialogue across cultural boundaries.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FC3E02]">
                Innovation
              </h3>
              <p className="text-gray-600">
                Leveraging technology to break down language barriers and create
                new ways of political engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
