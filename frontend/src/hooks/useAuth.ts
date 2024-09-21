import { checkSignedIn } from '@/apis/authApi';
import { NAVIGATION_PAGE, NOT_NEEDS_SIGNED_IN_PAGE } from '@/constants/navigation';
import { useSelector } from '@/store';
import { toggleIsSignedIn } from '@/store/auth';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  const isInNotNeedingAuthPage = useMemo(
    () => NOT_NEEDS_SIGNED_IN_PAGE.includes(location.pathname),
    [location],
  );

  const authRouting = useCallback(async () => {
    const isAuth = await checkSignedIn();
    dispatch(toggleIsSignedIn(isAuth));

    if (isAuth && isInNotNeedingAuthPage) navigate(NAVIGATION_PAGE.readingRecords.list);
    if (!isAuth && !isInNotNeedingAuthPage) navigate(NAVIGATION_PAGE.auth.signIn);
  }, [dispatch, isInNotNeedingAuthPage, navigate]);

  useEffect(() => {
    authRouting();
  }, [authRouting]);

  return {
    isSignedIn,
  };
};
