import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type DraggableProps = {
    children: React.ReactNode;
    /**
    * ドラッグ可能なエリアをユニークに識別する
    */
    id: string;
    className?: string
};

export default function Draggable({ children, id, className }: DraggableProps) {
    /**
     * attributes：Draggableアイテムに適した一連のデフォルト属性を提供してくれる
     * listeners：ドラッグ操作のイベントリスナーを含むため、操作したいコンポーネントに登録する
     */
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    /**
     * Draggableアイテムが選択されると、画面上でアイテムを移動するために必要な座標が設定される
     */
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`Draggable ${className}`}>
            {children}
        </button>
    );
}
