import Mailjet from 'node-mailjet';
import { User } from '@prisma/client';

const {
  MJ_API_KEY,
  MJ_SECRET_KEY,
  MJ_FROM,
  MJ_FROM_NAME,
  MJ_VALIDATION_TMP_ID,
  BASE_URL,
  MJ_RESET_PASSWORD_TMP_ID,
} = process.env;

const send = ({
  user,
  templateId,
  variables = {},
}: {
  user: User;
  templateId: number;
  variables: any;
}) => {
  const mailjet = Mailjet.apiConnect(MJ_API_KEY, MJ_SECRET_KEY).post('send', {
    'version': 'v3.1',
  });

  return mailjet.request({
    Messages: [
      {
        From: {
          Email: MJ_FROM,
          Name: MJ_FROM_NAME,
        },
        To: [
          {
            Email: user.email,
            // Name: `${user.firstName} ${user.lastName}`,
          },
        ],
        TemplateID: Number(templateId),
        TemplateLanguage: true,
        Variables: variables,
      },
    ],
  });
};

export const sendVerificationEmail = (
  user: User,
  verificationToken: string
) => {
  return send({
    user,
    templateId: MJ_VALIDATION_TMP_ID,
    variables: {
      verificationLink: `${BASE_URL}/api/auth/verify-account?userId=${user.id}&token=${verificationToken}`,
    },
  });
};

export const sendResetPasswordEmail = (
  user: User,
  resetPasswordToken: string
) => {
  return send({
    user,
    templateId: MJ_RESET_PASSWORD_TMP_ID,
    variables: {
      resetPasswordLink: `${BASE_URL}/reset-password?userId=${user.id}&token=${resetPasswordToken}`,
    },
  });
};
