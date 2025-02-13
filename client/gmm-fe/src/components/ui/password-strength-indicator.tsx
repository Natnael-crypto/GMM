'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type React from 'react';
import { isStrongPassword } from '@/lib/schemas/auth';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const [strength, setStrength] = useState(0);

  const getColor = (strength: number) => {
    const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#197149'];
    return colors[strength - 1] || colors[0];
  };

  useState(() => {
    setStrength(isStrongPassword(password).strength);
  });

  useEffect(() => {
    setStrength(isStrongPassword(password).strength);
  }, [password]);

  return (
    <div className="w-full space-y-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: getColor(strength) }}
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        {[1, 2, 3, 4, 5].map((level) => (
          <div key={level} className="flex items-center">
            {strength >= level ? (
              <Check size={12} className="text-green-500" />
            ) : (
              <X size={12} className="text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
