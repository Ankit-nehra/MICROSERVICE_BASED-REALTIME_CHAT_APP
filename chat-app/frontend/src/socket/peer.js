let peer = null;

export const createPeer = () => {

  peer = new RTCPeerConnection({

    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],

  });

  return peer;
};

export const getPeer = () => peer;

export const closePeer = () => {

  if (!peer) return;

  peer.close();

  peer = null;
};