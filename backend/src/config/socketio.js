import { Server } from 'socket.io';
import { commentController } from '../controllers/comment.controllers.js';
import { sendComment } from '../controllers/comment.controller.js';

export const realTimeSocketIo = (server) => {
  /* socket */
  const io = new Server(server, {
    cors: {
      origin: `http://localhost:4200`,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      creadentials: true,
    },
  });
  io.on('connection', (socket) => {
    let previousId;
    const safeJoin = (currentId) => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };
    socket.on('getDocs', async (postId) => {
      /* get all comment */
      try {
        const comments = await commentController.getCommentByIdBlog(postId);
        if (comments) {
          console.log('🚀 ~ file: socketio.js:32 ~ socket.on ~ comment:', comments);
          safeJoin(comments._id);
          io.emit('comments', comments);
        }
      } catch (error) {
        console.log(error);
      }
    });
    socket.on('addDoc', async (doc) => {
      try {
        const comment = await commentController.addComment(doc);
        if (comment) {
          const comments = await commentController.getCommentByIdBlog(comment.postId);
          if (comments) {
            safeJoin(comments._id);
            io.emit('comments', comments);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
    console.log(`Socket ${socket.id} has connected`);
    socket.on('comment', (data) => {
      console.log('🚀 ~ file: server.js:83 ~ socket.on ~ data:', data);
      io.emit('comment', data);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
