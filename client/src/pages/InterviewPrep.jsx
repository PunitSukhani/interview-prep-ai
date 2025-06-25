import { useParams } from 'react-router-dom';

export default function InterviewPrep() {
  const { sessionId } = useParams();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-purple-600">
        Interview Prep for Session: {sessionId}
      </h1>
    </div>
  );
}
