import { useDroppable } from '@dnd-kit/core';

type DroppableProps = {
    children: React.ReactNode;
    /**
     * ドロップ可能なエリアをユニークに識別する
     */
    id: string;
    /**
     * isOverが true の時のスタイル
     */
    isOverAddClass?: string;
    className?: string
};

export default function Droppable({ children, id, isOverAddClass, className }: DroppableProps) {

    /**
     * setNodeRef ドロップ可能なエリアの DOM ノードを参照
     * isOver ドラッグ中のアイテムがドロップ領域と重なっているかどうか
     */
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className={`Droppable ${className} ${isOver && isOverAddClass ? isOverAddClass : ""}`}>
            {children}
        </div>
    );
}