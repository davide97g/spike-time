import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useReservationFindReservationById } from "@/hooks/database/reservations/useReservationFindReservationById";
import dayjs from "dayjs";
import { CalendarIcon, ClockIcon, Copy, ShareIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function Reservation() {
  const { t } = useTranslation();

  const { reservationId } = useParams<{ reservationId: string }>();

  const { data: reservation, isFetching } = useReservationFindReservationById({
    id: reservationId,
  });

  const shareSocialLinks = () => {
    // TODO: translate this
    const shareData = {
      title: "Dettaglio Prenotazione",
      text: `You have a reservation on ${dayjs(reservation?.date).format(
        "DD/MM/YYYY"
      )} from ${String(reservation?.hourStart).padStart(2, "0")}h to ${String(
        reservation?.hourEnd
      ).padStart(2, "0")}h`,
      url: window.location.href,
    };
    navigator.share(shareData);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast(t("pages.reservation.copyLinkFeedback"));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {isFetching && (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px] mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      )}
      {reservation && !isFetching && (
        <Card className="w-full max-w-md">
          <CardHeader className="flex items-center w-full justify-between gap-2 flex-row">
            <CardTitle className="text-2xl font-bold text-center">
              {t("pages.reservation.title")}
            </CardTitle>
            <img src="/logo.png" alt="logo" className="w-16 h-16" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-primary" />
              <span className="text-lg">
                {dayjs(reservation?.date).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="text-primary" />
              <span className="text-lg">
                {String(reservation?.hourStart).padStart(2, "0")}h -{" "}
                {String(reservation?.hourEnd).padStart(2, "0")}h
              </span>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button className="w-full" onClick={() => shareSocialLinks()}>
              <ShareIcon className="mr-2 h-4 w-4" />{" "}
              {t("pages.reservation.shareOnSocial")}
            </Button>
            <Button className="w-full" onClick={() => copyLink()}>
              <Copy className="mr-2 h-4 w-4" />
              {t("pages.reservation.copyLink")}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
