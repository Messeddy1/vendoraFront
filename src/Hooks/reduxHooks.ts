import type { AppDispatch } from '../store/store';
import { useAppDispatch } from './reduxHooks';
// hooks/reduxHooks.ts
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector