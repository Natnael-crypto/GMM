import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function PendingApprovalMessage() {
  return (
    <div className="flex flex-col justify-center items-center text-primary gap-5 px-16">
      <FontAwesomeIcon icon={faCircleCheck} className="text-6xl" />
      <span className="text-xl font-bold text-center px-12">
        Your application has been submitted for review
      </span>

      <div className="text-sm text-center text-secondary flex flex-col gap-4 px-3">
        <p>
          An email receipt including the details about your
          <br /> order has been sent to the email address provided.
        </p>
        <p>Please keep it for your records.</p>
      </div>
    </div>
  );
}
