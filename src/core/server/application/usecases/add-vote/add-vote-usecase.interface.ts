import { VoteDTO } from "@/core/server/domain/dto/vote.dto.type";
import { Either } from "@/core/shared/errors/either";
import { GoogleRecaptchaInvalidHostnameError } from "../../errors/recaptcha-invalid-hostname.error";
import { GoogleRecaptchaInvalidTokenError } from "../../errors/recaptcha-invalid-token.error";
import { UnexpectedError } from "../../errors/unexpected-error";
import { UseCaseInterface } from "../usecase.interface";

export type AddVoteUseCaseInput = { 
  vote: VoteDTO;
  recaptchaTokenV2: string;
  recaptchaTokenV3: string;
};

export type AddVoteUsecaseOutput = Either<
  GoogleRecaptchaInvalidTokenError |
  GoogleRecaptchaInvalidHostnameError |
  UnexpectedError,
  any>;

export type AddVoteUsecaseInterface  = UseCaseInterface<AddVoteUseCaseInput, AddVoteUsecaseOutput>;