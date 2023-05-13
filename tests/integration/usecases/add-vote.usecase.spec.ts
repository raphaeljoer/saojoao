import assert from "assert";
import { describe, test } from "vitest";
import { AddVoteUsecase } from '../../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { VoteDTO } from '../../../src/core/server/domain/dto/vote.dto.type';
import { FakeRecaptchaGateway } from "../../fakes/fake-google-recaptcha";
import { FakeVoteRepository } from "../../fakes/fake-vote-repository";

describe("AddVoteUseCase", () => {
  test("Should add a new vote when recaptcha token is valid", async () => {
    const validToken = "validToken";
    const vote: VoteDTO = {
      artistId: "artistId",
      votedAt: "01/01/2023",
      ip: "ip",
    };

    const voteRepository = new FakeVoteRepository();
    const recaptchaGateway = new FakeRecaptchaGateway();
    const addVoteUseCase = new AddVoteUsecase({
      voteRepository,
      recaptchaGateway,
    });

    await addVoteUseCase.execute({
      vote,
      token: validToken,
    });

    const votes = await voteRepository.countVotes({ key: "artistId", value: vote.artistId });
    assert.strictEqual(votes, 1);
  });

  test("Should throw an error when recaptcha token is invalid", async () => {
    const invalidToken = "invalidToken";
    const vote: VoteDTO = {
      artistId: "artistId",
      votedAt: "01/01/2023",
      ip: "ip",
    };

    const voteRepository = new FakeVoteRepository();
    const recaptchaGateway = new FakeRecaptchaGateway();
    const addVoteUseCase = new AddVoteUsecase({ voteRepository, recaptchaGateway });

    await assert.rejects(
      async () => addVoteUseCase.execute({ vote, token: invalidToken }),
      {
        message: "Invalid recaptcha token",
      }
    );

    const total = await voteRepository.countVotesTotal();
    assert.strictEqual(total, 0);
  });
});