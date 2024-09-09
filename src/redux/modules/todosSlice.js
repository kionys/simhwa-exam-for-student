import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()
    console.log(payload)
    return payload
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()
    return payload
  }
);

const initialState = {
  list: [],
  status: 'idle'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload)
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(__addToDo.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(__deleteTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(todo => todo.id !== action.payload);
      })
      .addCase(__deleteTodo.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
