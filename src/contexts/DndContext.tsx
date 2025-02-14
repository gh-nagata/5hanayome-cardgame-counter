// src/contexts/DndProvider.tsx
import React, { ReactNode } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

type Props = {
    children: ReactNode,
    onDragEnd: (event: DragEndEvent) => void
}
export const DndProvider = (props: Props) => {
    return (
        <DndContext onDragEnd={props.onDragEnd}>
            {props.children}
        </DndContext>
    );
};
