import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useGetProfileByUserId } from '@queries/Auth/useGetProfileByUserId';
import { StudentProfileResponse } from '@queries/Students/types';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { profile: student } = useGetProfileByUserId<StudentProfileResponse>({
    id: String(userId),
  });

  const isShowingMessageButton = useMemo(() => {
    if (!user?.id || !student?.id) return false;
    return String(user?.id) !== String(student?.id);
  }, [user?.id, student?.id]);

  const handleViewChat = () => {
    navigate(`/chat/${user?.id}/${student?.id}`);
  };

  return {
    states: { student, isShowingMessageButton },
    handlers: { handleViewChat },
  };
};
