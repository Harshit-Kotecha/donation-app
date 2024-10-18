import leaderboardAnimation from '@assets/leaderboard.json';
import DonationQuote from '@components/atoms/DonationQuote';
import { endpoints } from 'constants/endpoints';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { get } from 'services/network/api-service';
import MainScreen from './MainScreen';

interface LeaderboardData {
  full_name: string;
  score: number;
  id: number;
}

export default function LeaderboardsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboards, setLeaderboards] = useState<LeaderboardData[]>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await get({ url: endpoints.leaderboard });
        setLeaderboards(res.data);
      } catch (error) {
        alert(error['message']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <MainScreen isLoading={isLoading}>
      <DonationQuote
        title="Donate, Lead, Inspire! "
        subtitle="Your generosity can inspire others to give. Keep donating, climb the leaderboard, and leave a lasting legacy of kindness."
        className="px-2 pt-4 md:pt-6 lg:pt-10"
      />
      <Lottie
        className={`max-w-[250px] mb-0 mx-auto`}
        animationData={leaderboardAnimation}
        loop={true}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm lg:text-xl font-light">
          <thead className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white">
            <tr>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards?.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0  transition duration-300 ease-in-out"
              >
                <td className={`px-6 py-4 ${index < 3 && 'font-bold'}`}>
                  {index + 1}
                </td>
                <td className={`px-6 py-4 ${index < 3 && 'font-bold'}`}>
                  {row.full_name}
                </td>
                <td className={`px-6 py-4 ${index < 3 && 'font-bold'}`}>
                  {row.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainScreen>
  );
}
