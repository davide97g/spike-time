import { AlertDialogModal } from "@/components/custom/AlertDialog";
import { DatePicker } from "@/components/custom/DatePicker";
import Dropdown from "@/components/custom/Dropdown";
import { Modal } from "@/components/custom/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import dayjs from "dayjs";
import { Edit, Share, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderReservations } from "./LoaderReservations";
import { useReservations } from "./useReservations";
import { generateTimeSlots } from "@/utils/generateTimeSlots";

export function Reservations() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [showActive, setShowActive] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [startDateEditMode, setStartDateEditMode] = useState<Date | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const {
    reservations,
    allReservations,
    getReservationStatus,
    isLoading,
    isLoadingAllReservations,
    deleteReservation,
    refetch,
    updateReservation,
  } = useReservations({
    startDate,
    startDateEditMode,
  });

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <h1 className="text-xl font-bold mb-6">Reservations</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-[300px]">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <DatePicker selectedDate={startDate} onSelect={setStartDate} />
          </div>
        </div>
        <div className="flex items-end">
          <Toggle
            pressed={showActive}
            onPressedChange={setShowActive}
            aria-label="Toggle active reservations"
            disabled
          >
            {showActive ? (
              <>
                <ToggleRight className="h-4 w-4 mr-2" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4 mr-2" />
                Expired
              </>
            )}
          </Toggle>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <LoaderReservations />
        ) : (
          reservations
            ?.sort((rA, rB) => {
              return dayjs(rA.date)
                .hour(rA.hourStart)
                .isBefore(dayjs(rB.date).hour(rB.hourStart))
                ? 1
                : -1;
            })
            ?.map((reservation) => {
              const status = getReservationStatus(reservation);
              return (
                <Card
                  key={reservation.id}
                  className={`flex ${
                    status === "expired" ? "border-red-200" : ""
                  } ${status === "locked" ? "border-orange-200" : ""}
                  ${status === "active" ? "border-green-200" : ""}
                  `}
                >
                  <div className="flex-shrink-0 w-16 bg-gray-100 flex items-center justify-center rounded-l-xl">
                    <img
                      src="logo.png"
                      alt="Company logo"
                      className="w-12 h-12"
                    />
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">
                          {dayjs(reservation.date).format("DD/MM/YYYY")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {`${reservation.hourStart}:00`} -{" "}
                          {`${reservation.hourEnd}:00`}
                        </p>
                      </div>

                      {status === "active" && (
                        <>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Edit reservation"
                              onClick={() =>
                                navigate(`/share-reservation/${reservation.id}`)
                              }
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                            <Modal
                              dialogTrigger={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label="Edit reservation"
                                  onClick={() => {
                                    setStartDateEditMode(
                                      dayjs(reservation.date).toDate()
                                    );
                                    setSelectedTime(
                                      `${reservation.hourStart
                                        .toString()
                                        .padStart(2, "0")}:00`
                                    );
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              }
                              onConfirmButton={
                                <Button
                                  onClick={() => {
                                    if (!startDateEditMode || !selectedTime) {
                                      toast(
                                        `${
                                          !startDateEditMode
                                            ? "Data mancante"
                                            : "Orario mancante"
                                        }`,
                                        {
                                          description: `${
                                            !startDateEditMode
                                              ? "Inserire una data"
                                              : "Inserire un orario"
                                          }`,
                                        }
                                      );
                                      return;
                                    }

                                    updateReservation({
                                      reservation: {
                                        ...reservation,
                                        date: dayjs(startDateEditMode).format(
                                          "YYYY-MM-DD"
                                        ),
                                        hourStart: parseInt(
                                          selectedTime?.split(":")[0]
                                        ),
                                        hourEnd:
                                          parseInt(
                                            selectedTime?.split(":")[0]
                                          ) + 1,
                                      },
                                    }).finally(() => refetch());
                                    refetch();
                                  }}
                                >
                                  Salva
                                </Button>
                              }
                              title="Modifica prenotazione"
                            >
                              {isLoadingAllReservations ? (
                                <LoaderReservations />
                              ) : (
                                <div className="flex flex-col gap-2">
                                  <p>
                                    Sei sicuro di voler modificare la
                                    prenotazione?
                                  </p>
                                  <DatePicker
                                    selectedDate={startDateEditMode}
                                    onSelect={setStartDateEditMode}
                                  />
                                  <Dropdown
                                    placeholder="Seleziona un orario"
                                    label="Orario"
                                    options={generateTimeSlots({
                                      reservations:
                                        allReservations?.filter(
                                          (r) => r.id !== reservation.id
                                        ) ?? [],
                                    })}
                                    selectedValue={selectedTime}
                                    onChange={(value) => setSelectedTime(value)}
                                  />
                                </div>
                              )}
                            </Modal>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Delete reservation"
                              onClick={() => setIsDeleteDialogOpen(true)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <AlertDialogModal
                            isOpen={isDeleteDialogOpen}
                            onChange={() => setIsDeleteDialogOpen(false)}
                            title="Cancella prenotazione"
                            text={`Sei sicuro di voler cancellare la prenotazione ${dayjs(
                              reservation.date
                            ).format("DD/MM/YYYY")} alle ore ${
                              reservation.hourStart
                            }:00?`}
                            onCofirm={() =>
                              deleteReservation(reservation).finally(() =>
                                refetch()
                              )
                            }
                          />
                        </>
                      )}
                      {status !== "active" && (
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              status === "expired" ? "destructive" : "secondary"
                            }
                          >
                            {status === "expired" ? "Expired" : "Locked"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
}
