'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export default function ConfirmDialog({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}) {
  const isDanger = variant === 'danger';

  return (
    <AlertDialog.Root open={open} onOpenChange={(open) => !open && onCancel?.()}>
      <AlertDialog.Content style={{ maxWidth: 420 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2" mb="4">
          {message}
        </AlertDialog.Description>
        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft">{cancelLabel}</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm}>
            <Button color={isDanger ? 'red' : 'gray'}>{confirmLabel}</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
