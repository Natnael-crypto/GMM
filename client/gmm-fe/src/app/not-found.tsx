'use client';

import { Link } from '@/lib/navigation';
import { motion } from 'framer-motion';
import { IntlProvider } from 'next-intl';

export default function NotFound() {
  const messages = {};

  return (
    <html lang="en">
      <body>
        <IntlProvider messages={messages} locale="en">
          <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-9xl font-bold text-[#59a409]">404</h1>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold text-foreground mt-4">
                  Page Not Found
                </h2>
                <p className="text-muted-foreground mt-2 mb-6">
                  Oops! The page you&apos;re looking for doesn&apos;t exist.
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="px-6 py-3 text-[#59a409]-foreground bg-[#59a409] rounded-md hover:bg-[#59a409]/90 transition-colors duration-200 font-medium text-white"
                >
                  Go Home
                </Link>
              </motion.div>
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem]"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-[#59a409]/20 rounded-full"
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </IntlProvider>
      </body>
    </html>
  );
}
