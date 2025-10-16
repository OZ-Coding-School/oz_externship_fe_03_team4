import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SearchInput, type SearchInputProps } from "./SearchInput";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

type SearchFieldProps = Omit<SearchInputProps, "onChangeText"> & {
    label?: ReactNode;
    hintText?: ReactNode;
    errorMessage?: ReactNode;
    onSearch?: (value:string) => void;
    debounceMilliseconds?: number;
    fieldIdentifier?: string;
}

export const SearchField = ({
    label,
    hintText,
    errorMessage,
    onSearch,
    debounceMilliseconds = 250,
    fieldIdentifier = "search",
    value,
    defaultValue,
    onSubmit,
    ...rest
}: SearchFieldProps) => {
    
}