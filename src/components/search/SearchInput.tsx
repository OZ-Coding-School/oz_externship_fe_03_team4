import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { sizePresets, type BaseInputProps } from "../../types/search/types";
import { cn } from "../../utils/cn";

export type SearchInputRef = { focus: () => void; clear: () => void };
export type SearchInputProps = BaseInputProps & {
    onChangeText?: (v:string) => void;
    onSubmit?: (v:string) => void;
};

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
    function SearchInput(
        {
            value,
            defaultValue,
            placeholder,
            leftIcon = <SearchIcon />,
            disabled,
            fullWidth = true,
            size = "md",
            clearable = true,
            className,
            inputProps,
            onChangeText,
            onSubmit,
        },
        ref
    ) {
        const isControlledInput = value !== undefined;
        const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
        const currentValue = isControlledInput ? (value as string) : uncontrolledValue;

        const inputElementRef = useRef<HTMLInputElement>(null);
        const sizePreset = sizePresets[size];

        useImperativeHandle(forwardedRef, () => ({
            focus: () => inputElementRef.current?.focus(),
            clear: () => handleClear(),
        }));

        function setValue(nextValue: string) {
            if (!isControlledInput) setUncontrolledValue(nextValue);
            onChangeText?.(nextValue);
        }

        function handleClear() {
            setValue("");


    }
)



