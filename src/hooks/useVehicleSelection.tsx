import { useEffect, useMemo, useState } from 'react';

export type Vehicle = {
  id: string;
  jenis: string;
  merk: string;
  model: string;
  cc: string;
  tahun: string;
};

type Mode = 'EMPTY' | 'SINGLE' | 'MULTIPLE';

export function useVehicleSelection(vehicles: Vehicle[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 🔁 Sync saat data berubah (AMAN Fast Refresh & API)
  useEffect(() => {
    if (vehicles.length === 1) {
      setSelectedId(vehicles[0].id);
    } else {
      setSelectedId(null);
    }
  }, [vehicles]);

  const mode: Mode = useMemo(() => {
    if (vehicles.length === 0) return 'EMPTY';
    if (vehicles.length === 1) return 'SINGLE';
    return 'MULTIPLE';
  }, [vehicles.length]);

  const selectedVehicle = useMemo(
    () => vehicles.find(v => v.id === selectedId) ?? null,
    [vehicles, selectedId],
  );

  return {
    mode, // EMPTY | SINGLE | MULTIPLE
    vehicles,
    selectedVehicle,
    selectedId,
    selectVehicle: setSelectedId,
  };
}
