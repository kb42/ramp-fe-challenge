import { useCallback, useState } from "react"
import { Employee, RequestByEmployeeParams } from "../utils/types"
import { EmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)

  const fetchAll = useCallback(async () => {
    const data = await fetchWithCache<Employee[], RequestByEmployeeParams>("employees", {
      employeeId: "",
    })

    setEmployees(data)
  }, [fetchWithCache])

  const invalidateData = useCallback(() => {
    setEmployees(null)
  }, [])

  const setData = useCallback((data: Employee[] | null) => {
    setEmployees(data)
  }, [])

  return { data: employees, loading, fetchAll, invalidateData, setData }
}
