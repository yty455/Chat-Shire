import api from "./api";

//####### 초대

// 초대 조회
export const getInvitation = () => api.get(`/invitations`);

// 초대 수락
export const acceptInvitation = (invitationId: string) =>
  api.patch(`/invitations/${invitationId}/accept`);

// 초대 거절
export const rejectInvitation = (invitationId: string) =>
  api.patch(`/invitations/${invitationId}/reject`);
