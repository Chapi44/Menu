"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-8 max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has
            occurred. Our team has been notified and is working to fix the
            issue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-lg border"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Error details (for support):
          </p>
          <code className="text-sm bg-muted p-2 rounded block text-left overflow-auto">
            {error.message || "Unknown error"}
            {error.digest && <div className="mt-2">Digest: {error.digest}</div>}
          </code>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go back home</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground"
        >
          <p>
            Need help?{" "}
            <Link
              href="/help"
              className="text-primary hover:text-primary/90 underline underline-offset-4"
            >
              Visit our help center
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-primary hover:text-primary/90 underline underline-offset-4"
            >
              contact support
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
