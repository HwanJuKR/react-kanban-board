import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function App() {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
