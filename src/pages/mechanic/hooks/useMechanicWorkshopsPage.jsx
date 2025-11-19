// src/pages/mechanic/hooks/useMechanicWorkshopsPage.jsx
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useListAllWorkshopsQuery,
  useListMyWorkshopsQuery,
  useEnrollWorkshopMutation,
  useUnenrollWorkshopMutation,
} from "../../../apis/mechanic/mechanic.api";

export default function useMechanicWorkshopsPage() {
  const user = useSelector((state) => state.workshop_user);
  const mechanicId = user?.id;

  const {
    data: allWorkshopsData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
    refetch: refetchAll,
  } = useListAllWorkshopsQuery();

  const {
    data: myWorkshopsData,
    isLoading: isLoadingMine,
    isError: isErrorMine,
    error: errorMine,
    refetch: refetchMine,
  } = useListMyWorkshopsQuery({ mechanicId }, { skip: !mechanicId });

  const [enrollWorkshop, { isLoading: isEnrolling }] =
    useEnrollWorkshopMutation();

  const [unenrollWorkshop, { isLoading: isUnenrolling }] =
    useUnenrollWorkshopMutation();

  const allWorkshops = useMemo(
    () => allWorkshopsData || [],
    [allWorkshopsData],
  );
  const myWorkshops = useMemo(() => myWorkshopsData || [], [myWorkshopsData]);

  const myWorkshopIds = useMemo(
    () => new Set(myWorkshops.map((w) => w.id)),
    [myWorkshops],
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const isMutating = isEnrolling || isUnenrolling;

  const enrollInWorkshop = async (workshopId, workshopName) => {
    if (!mechanicId) {
      showSnackbar("No se pudo determinar el mecánico logueado.", "error");
      return;
    }

    try {
      await enrollWorkshop({ mechanicId, workshopId }).unwrap();
      showSnackbar(
        `Te inscribiste correctamente al taller "${workshopName}".`,
        "success",
      );
      refetchMine();
      refetchAll();
    } catch (error) {
      const backendMsg =
        error?.data?.message || "No se pudo inscribirse al taller.";
      showSnackbar(backendMsg, "error");
    }
  };

  const unenrollFromWorkshop = async (workshopId, workshopName) => {
    if (!mechanicId) {
      showSnackbar("No se pudo determinar el mecánico logueado.", "error");
      return;
    }

    try {
      await unenrollWorkshop({ mechanicId, workshopId }).unwrap();
      showSnackbar(
        `Te desinscribiste del taller "${workshopName}".`,
        "success",
      );
      refetchMine();
      refetchAll();
    } catch (error) {
      const backendMsg =
        error?.data?.message || "No se pudo desinscribirse del taller.";
      showSnackbar(backendMsg, "error");
    }
  };

  return {
    mechanicId,
    allWorkshops,
    myWorkshops,
    myWorkshopIds,

    isLoadingAll,
    isErrorAll,
    errorAll,
    isLoadingMine,
    isErrorMine,
    errorMine,
    isMutating,

    refetchAll,
    refetchMine,

    enrollInWorkshop,
    unenrollFromWorkshop,

    snackbar,
    closeSnackbar,
  };
}
