import { useCallback, useEffect } from "react";
import { useLazyGetUserQuery } from "../redux/api/auth";
import { actions, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { AUTH_TOKEN } from "../lib/constants";

export const useFetchProfile = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [getProfile, { isLoading }] = useLazyGetUserQuery();

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem(AUTH_TOKEN);
      if (storedToken) {
        actions.auth.setToken(storedToken);
      }
    }
  }, []);

  const handleFetch = useCallback(async () => {
    const { data: user, error } = await getProfile(null);
    actions.auth.setIsLoading(isLoading);

    if (!isLoading) {
      if (error) {
        actions.auth.setCurrentUser(null);
      } else {
        actions.auth.setCurrentUser(user);
      }
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [token]);

  return isLoading;
};
