import { useViewMechanicReviewsQuery } from "../../../../apis/admin/admin.api";

export default function useAdminMechanicReviews(mechanicId) {
  const { data, isLoading, isError, error } =
    useViewMechanicReviewsQuery(mechanicId);

  return {
    reviews: data || [],
    isLoading,
    isError,
    error,
  };
}
