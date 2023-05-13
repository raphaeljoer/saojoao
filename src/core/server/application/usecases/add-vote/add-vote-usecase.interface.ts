import { VoteDTO } from "@/core/server/domain/dto/vote.dto.type";
import { Either } from "@/core/shared/errors/either";
import { AddVoteError } from "../errors/add-vote.error";
import { GoogleRecaptchaError } from "../errors/recaptcha.error";
import { UseCaseInterface } from "../usecase.interface";

export type AddVoteUseCaseInput = { vote: VoteDTO; token: string; };
export type AddVoteUsecaseOutput = Either<GoogleRecaptchaError | AddVoteError, any>
export type AddVoteUsecaseInterface  = UseCaseInterface<AddVoteUseCaseInput, AddVoteUsecaseOutput>;