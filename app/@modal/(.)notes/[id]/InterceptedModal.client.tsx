'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import Modal from '@/components/Modal/Modal';

interface InterceptedModalProps {
  children: ReactNode;
}

export default function InterceptedModal({ children }: InterceptedModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <Modal onClose={handleClose}>{children}</Modal>;
}
