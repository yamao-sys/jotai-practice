import { checkSignedIn } from '@/apis/authApi';
import { NAVIGATION_PAGE, NOT_NEEDS_SIGNED_IN_PAGE } from '@/constants/navigation';
import { isSignedIn } from '@/jotai/auth';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useAtom(isSignedIn);

  const isInNotNeedingAuthPage = useMemo(
    () => NOT_NEEDS_SIGNED_IN_PAGE.includes(location.pathname),
    [location],
  );

  const authRouting = useCallback(async () => {
    const isAuth = await checkSignedIn();
    setIsLoggedIn(isAuth);

    if (isAuth && isInNotNeedingAuthPage) navigate(NAVIGATION_PAGE.readingRecords.list);
    if (!isAuth && !isInNotNeedingAuthPage) navigate(NAVIGATION_PAGE.auth.signIn);
  }, [setIsLoggedIn, isInNotNeedingAuthPage, navigate]);

  useEffect(() => {
    authRouting();
  }, [authRouting]);

  return {
    isLoggedIn,
  };
};
