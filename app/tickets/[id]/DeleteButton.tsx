"use client"
import { buttonVariants } from "@/components/ui/button"
import axios from "axios"
import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

const DeleteButton = ({ ticketId }: { ticketId: number }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const deleteTicket = async () => {
    try {
      setIsDeleting(true)
      await axios.delete("/api/tickets/" + ticketId)
      router.push("/tickets")
    } catch (e) {
      setIsDeleting(false)
      setError("Unknown Error Occurred")
    }
  }
  return (
    <div className="mb-4">
      <AlertDialog>
        <AlertDialogTrigger
          className={
            buttonVariants({
              variant: "destructive",
            }) + "text-white-500 w-full min-w-32"
          }
          disabled={isDeleting}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteTicket}
              className={
                buttonVariants({
                  variant: "destructive",
                }) + "text-white-500"
              }
              disabled={isDeleting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </div>
  )
}

export default DeleteButton
