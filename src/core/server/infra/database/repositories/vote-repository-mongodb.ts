import { CountByIdInput, VoteRepositoryInterface } from "../../../application/repository/vote.repository.interface";
import { VoteDTO } from "../../../domain/dto/vote.dto.type";
import { MongoDbConnectionInterface } from "../connection/mongodb-connection.interface";

type Props = {
  connection: MongoDbConnectionInterface
};
export class VoteRepositoryMongodb implements VoteRepositoryInterface {
  private readonly connection: MongoDbConnectionInterface;
  private readonly collectionName: string;
  
  constructor(private readonly props: Props) {
    this.connection = this.props.connection
    this.collectionName = 'votes';
  }

  async addVote(vote: VoteDTO): Promise<void> {
    await this.connection.insertOne({ 
      collectionName: this.collectionName,  
      document: vote 
    });
  }

  async countVotesTotal(): Promise<number> {
    return this.connection.estimatedDocumentCount(this.collectionName);
  }
  
  async countVotes({ key, value }: CountByIdInput): Promise<number> {
    return await this.connection.countDocuments({
      collectionName: this.collectionName,
      key,
      value
    });
  } 
}